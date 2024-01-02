import { Link, useNavigate } from "react-router-dom";
import { s, styled } from "style/stitches.config";
import {
  ReaderIcon,
  DragHandleDots2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { useNoteParams } from "route/notes/note/params";
import { useState } from "react";
import { LoadingShim } from "component/ui/LoadingShim";
import { NodeType, TreeNode, useNoteTreeQuery } from "api/tree";
import { invariant } from "exception/invariant";
import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { useDraggableNode, useNoteTreeDrag } from "./hooks";
import { When } from "component/When";
import Spacer from "component/ui/Spacer";
import {
  CreateDirectoryButton,
  CreateNoteButton,
  DirectoryDropzone,
  NodeDelete,
  NodeName,
} from "./components";

export function NoteTree({
  editing,
  width,
}: {
  editing: boolean;
  width: number;
}) {
  const { data: tree, error, isLoading } = useNoteTreeQuery();

  const navigate = useNavigate();
  const DragContext = useNoteTreeDrag();

  if (isLoading) {
    return <LoadingShim />;
  }

  if (error) {
    return <s.div css={{ flex: 1 }}>Error: {error.message}</s.div>;
  }

  return (
    <NoteNodes css={{ flex: 1 }}>
      <Head>
        <CreateNoteButton onSuccess={navigate} />
        <CreateDirectoryButton />
      </Head>
      <DragContext>
        <DirectoryDropzone directoryKey={null} css={{ flex: 1 }}>
          {tree?.map((node) => (
            <NoteTreeNode key={node.key} node={node} editing={editing} />
          ))}
        </DirectoryDropzone>
        <DragOverlay style={{ width: width - 8 - 8 }}>
          <PreviewNode />
        </DragOverlay>
      </DragContext>
    </NoteNodes>
  );
}
const Head = styled("div", {
  d: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  pb: 8,
});
const NoteNodes = styled("ul", {
  m: 0,
  p: 8,
  d: "flex",
  direction: "column",
});

function PreviewNode() {
  const { active, over } = useDndContext();

  if (!active) return null; // no component being dragged

  const { id, data } = active;
  //@ts-expect-error DnD-KIt lacks strict typing
  const { name, type } = data.current;

  return (
    <NoteTreeNode
      node={{
        key: id.toString(),
        name,
        parentKey: over?.id.toString() ?? null,
        type,
        children: [],
      }}
      editing={false}
    />
  );
}

function NoteTreeNode({ node, editing }: { node: TreeNode; editing: boolean }) {
  const { noteKey } = useNoteParams({ noexcept: true });

  const isNote = node.type === "note";
  const isDirectory = node.type === "directory";
  invariant(!isNote || !isDirectory, `Unknown node type: ${node}`);

  const [renaming, setRenaming] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const Icon = getIcon(node.type, expanded);

  const selected = noteKey === node.key;

  const { handle: DragHandle, isDragging, ref } = useDraggableNode(node);

  const row = (
    <>
      <NoteInner
        ref={ref}
        selected={selected}
        expanded={expanded}
        {...(isNote
          ? { as: Link, to: node.key }
          : { as: s.button, onClick: () => setExpanded(!expanded) })}
      >
        <DragHandle>
          <When
            selector={`${NoteInner}:hover &`}
            fallback={<Icon />}
            css={{ d: "flex", items: "center", justify: "center" }}
          >
            <DragHandleDots2Icon />
          </When>
        </DragHandle>
        <NodeName
          renaming={renaming}
          onRenamingChange={setRenaming}
          node={node}
        />
      </NoteInner>
      {editing && <NodeDelete node={node} />}
    </>
  );

  if (isNote) {
    return <NoteNodeRoot hide={isDragging}>{row}</NoteNodeRoot>;
  }

  return (
    <>
      <DirectoryDropzone directoryKey={node.key}>
        <NoteNodeRoot hide={isDragging}>{row}</NoteNodeRoot>
        {expanded && (
          <>
            <SubDirectories>
              {node.children?.map((child) => (
                <NoteTreeNode key={child.key} node={child} editing={editing} />
              ))}
            </SubDirectories>
            {!node.children.length && <Spacer />}
          </>
        )}
      </DirectoryDropzone>
    </>
  );
}

function getIcon(type: NodeType, expanded: boolean) {
  if (type === "note") return ReaderIcon;
  return expanded ? ChevronDownIcon : ChevronRightIcon;
}

const NoteInner = styled(s.div, {
  r: 8,
  d: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 8,
  p: 8,
  items: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  variants: {
    selected: {
      true: { bg: "$primaryTonal", color: "$onPrimaryTonal", fontWeight: 400 },
      false: { "&:hover": { bg: "$background3" } },
    },
    expanded: { true: { fontWeight: 600 } },
  },

  defaultVariants: {
    selected: false,
    expanded: false,
  },
});
const NoteNodeRoot = styled(s.div, {
  d: "grid",
  gridTemplateColumns: "1fr auto",
  items: "center",
  listStyle: "none",

  variants: {
    hide: { true: { visibility: "hidden" } },
  },

  defaultVariants: {
    hide: false,
  },
});

const SubDirectories = styled("div", {
  bl: "1px solid $outline2",
  ml: 14,
  pl: 6,
});
