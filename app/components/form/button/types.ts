import type { WidthOption } from "../types";

export type FormButtonState = "idle" | "loading" | "success" | "error";
export type FormButtonStyle = "solid" | "outline";
export type FormButtonType = "submit" | "back" | "otp";
export type FormButtonIcon =
  | "send"
  | "arrowBack"
  | "arrowForward"
  | "call"
  | "sms"
  | "lock"
  | "check";

export type FormActionButton = {
  id: string;
  type: FormButtonType;
  label: string;
  width: WidthOption;
  tabletWidth?: WidthOption;
  mobileWidth?: WidthOption;
  isLabelVisible?: boolean;
  isLeftIconVisible?: boolean;
  isRightIconVisible?: boolean;
  leftIcon?: FormButtonIcon;
  rightIcon?: FormButtonIcon;
  variant?: FormButtonStyle;
  fillColor?: string;
  borderColor?: string;
  textColor?: string;
  radiusMode?: "all" | "individual";
  radius?: number;
  radiusTopLeft?: number;
  radiusTopRight?: number;
  radiusBottomRight?: number;
  radiusBottomLeft?: number;
  borderWidth?: number;
  textSize?: number;
  textWeight?: number;
  paddingMode?: "all" | "individual";
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
};

export type FormButtonProps = {
  label: string;
  state: FormButtonState;
  actionType?: FormButtonType;
  isLabelVisible?: boolean;
  isLeftIconVisible?: boolean;
  isRightIconVisible?: boolean;
  leftIcon?: FormButtonIcon;
  rightIcon?: FormButtonIcon;
};
