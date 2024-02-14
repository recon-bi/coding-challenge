import Card from "@mui/material/Card";

interface Props {
  shadow?: boolean;
  children?: any;
  height?: any;
  width?: any;
  color?: string;
  position?: any;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  display?: number | string;
  justifyContent?: number | string;
  alignItems?: number | string;
}

function MDCard({
  children,
  shadow,
  height,
  width,
  color,
  position,
  top,
  right,
  bottom,
  left,
  display,
  justifyContent,
  alignItems,
}: Props): JSX.Element {
  return (
    <Card
      sx={{
        height: height,
        width: width,
        background: color,
        boxShadow: !shadow ? "none" : "0",
        position: !position ? "" : position,
        top: !top ? "" : top,
        right: !right ? "" : right,
        bottom: !bottom ? "" : bottom,
        left: !left ? "" : left,
        display: !display ? "flex" : "",
        justifyContent: !justifyContent ? "center" : "",
        alignItems: !alignItems ? "center" : "",
      }}
    >
      {children}
    </Card>
  );
}

MDCard.defaultProps = {
  shadow: true,
  height: "100%",
  width: "100%",
};

export default MDCard;
