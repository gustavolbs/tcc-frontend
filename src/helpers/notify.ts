import { toast } from "react-hot-toast";

export const notify = (type: "success" | "error", message: string) => {
  return toast[type](message);
};
