export type LowercaseCharacter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export type UppercaseCharacter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type NumericCharacter =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type SpecialCharacter =
  | "_"
  | "$"
  | "@"
  | "#"
  | "&"
  | "!"
  | "-"
  | "+"
  | "="
  | "*"
  | "/"
  | "?"
  | "%"
  | "^"
  | "~"
  | "."
  | ","
  | "<"
  | ">"
  | "|"
  | "{"
  | "}"
  | "["
  | "]"
  | "("
  | ")"
  | ";"
  | ":"
  | "'"
  | '"'
  | "`";

export type WhitespaceCharacter = " ";

export type LexicalCharacter = LowercaseCharacter | UppercaseCharacter;

export type Character =
  | LexicalCharacter
  | NumericCharacter
  | SpecialCharacter
  | WhitespaceCharacter;
