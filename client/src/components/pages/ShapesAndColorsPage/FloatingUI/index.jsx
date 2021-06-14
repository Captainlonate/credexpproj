import {
  FloatingUIShell,
  ControlSection,
  ControlLabel,
} from './styles'
import Select from 'react-select'
import chroma from 'chroma-js'

const shapeOptions = [
  { label: 'Square', value: 'square' },
  { label: 'Triangle', value: 'triangle' },
  { label: 'Star', value: 'star' },
  { label: 'Circle', value: 'circle' },
]

const colorOptions = [
  { value: '#ff0000', color: '#ff0000', label: 'Red' },
  { value: '#00ff00', color: '#00ff00', label: 'Green' },
  { value: '#0000ff', color: '#0000ff', label: 'Blue' },
]

const colorStyles = {
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
};

const FloatingUI = () => {
  return (
    <FloatingUIShell>
      <ControlSection>
        <ControlLabel>Shape</ControlLabel>
        <Select
          options={shapeOptions}
          defaultValue={shapeOptions[0]}
        />
      </ControlSection>
      <ControlSection>
        <ControlLabel>Colors</ControlLabel>
        <Select
          options={colorOptions}
          closeMenuOnSelect={false}
          isMulti
          styles={colorStyles}
          defaultValue={[colorOptions[0]]}
        />
      </ControlSection>
    </FloatingUIShell>
  )
}

export default FloatingUI
