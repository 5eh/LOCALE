export default function Modal({ open, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center  transition-colors
        ${open ? 'visible bg-black/20 backdrop-blur-sm' : 'invisible '}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
           transition-all
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
      >
        {children}
      </div>
    </div>
  );
}
