import styled from 'styled-components'
import chroma from 'chroma-js'

export const FloatingUIShell = styled.div`
  position: fixed;
  top: 2vw;
  left: 2vw;
  padding: 1vw;
  z-index: 5;
  min-width: 40vw;
`

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ControlLabel= styled.div`
  font-size: 2vw;
  color: white;
  padding-bottom: 1vw;
`

export const ControlSection = styled.div`
  padding: 1vw 0;
`

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
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
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