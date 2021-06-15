import styled from 'styled-components'
import chroma from 'chroma-js'

export const FloatingUIShell = styled.div`
  position: fixed;
  top: 2vw;
  left: 2vw;
  padding: 1vw;
  z-index: 5;
  min-width: 30rem;
`

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ControlLabel= styled.div`
  font-size: 1.5rem;
  color: white;
  padding-bottom: 1rem;
`

export const ControlSection = styled.div`
  padding: 1rem 0;
`

// These styles are specifically for a react-select, that is a multi-select,
// that picks colors. It uses chroma.js to look at the label of the color option,
// and set a hover color, text colors, background color, and color preview
// This is from the react-select documentation
export const coloredSelectStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black')
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
}