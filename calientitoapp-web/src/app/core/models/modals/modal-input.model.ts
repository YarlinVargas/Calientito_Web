import { colors } from "../general/general.model";
import { imgModals, infoBtnModal } from "./modal-data.model";

export interface ModalInput {
  img: imgModals;
  title?: string;
  color: colors;
  input: {
    type: string;
    label: string;
    placeholder: string;
    name: string;
  }
  firstButton: infoBtnModal;
  secondButton?: infoBtnModal;
  footer: boolean;
}
