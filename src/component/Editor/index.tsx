import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from "@lexical/markdown";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { TRANSFORMERS } from "./transformers";
import { EditorState } from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { CSS, styled } from "style/stitches.config";
import { defined } from "util/variable";

const NODES = [
  HorizontalRuleNode,
  HeadingNode,
  QuoteNode,
  CodeNode,

  LinkNode,
  ListNode,
  ListItemNode,

  TableNode,
  TableRowNode,
  TableCellNode,
];

const NAMESPACE = "note-editor";

export function Editor({
  value,
  placeholder = "",
  onChange,
  css,
}: {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  css?: CSS;
}) {
  const handleChange = (state: EditorState) => {
    state.read(() => {
      const markdown = $convertToMarkdownString();
      onChange(markdown);
    });
  };

  const onInit = () => {
    $convertFromMarkdownString(value, TRANSFORMERS);
  };

  return (
    <Root css={css}>
      <LexicalComposer
        initialConfig={{
          nodes: NODES,
          namespace: NAMESPACE,
          onError: console.error,
          editorState: onInit,
        }}
      >
        <RichTextPlugin
          contentEditable={<ContentEditable autoFocus />}
          placeholder={defined(placeholder, <span>{placeholder}</span>)}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
        <TablePlugin />
        {!value ? <AutoFocusPlugin /> : ""}
      </LexicalComposer>
    </Root>
  );
}

const Root = styled("article", {
  // lexical root
  "&>div": {
    "&:focus": {
      outline: "none",
    },
  },
});
