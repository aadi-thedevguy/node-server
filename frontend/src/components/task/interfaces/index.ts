
export interface ITaskHeader {
  title?: string;
  date?: Date;
}

export interface ITaskDescription {
  description?: string;
}

export interface ITaskFooter {
  id: string;
  status: string;
  statusState? : boolean;
  onStatusChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    id : string
  ) => void;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id : string
  ) => void;
}

export interface ITask
  extends ITaskHeader,
    ITaskDescription,
    ITaskFooter {
  priority?: string;
}
