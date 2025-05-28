import classNames from "classnames";

interface ModalProps {
  title?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: VoidFunction;
  classes?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  body,
  footer,
  onClose,
  classes = "justify-end",
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg min-w-[40vw] max-w-[90vw] min-h-[25vh] max-h-[90vh] flex flex-col shadow-md">
        {title ? (
          <div className="p-4 border-b text-center md:text-start">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        ) : null}
        {body ? (
          <div className="p-4 overflow-y-auto flex-grow">
            {body}
          </div>
        ) : null}
        {footer ? (
          <div
            className={`p-4 border-t flex flex-col sm:flex-row ${classes} gap-2`}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
};
