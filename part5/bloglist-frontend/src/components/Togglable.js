import { useState, forwardRef, useImperativeHandle, cloneElement } from "react";


const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  function toggleVisibility() {
    setVisible(!visible);
  }

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const child = cloneElement(props.children, { toggleVisibility });

return (
  <>
    <div style={hideWhenVisible}>
      <button onClick={() => toggleVisibility()}>{props.buttonLabel}</button>
    </div>
    <div style={showWhenVisible}>
      {child}
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  </>
)
})

export default Togglable;
