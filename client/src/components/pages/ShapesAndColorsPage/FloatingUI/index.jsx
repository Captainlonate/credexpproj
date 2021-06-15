import {
  FloatingUIShell,
  ControlSection,
  ControlLabel,
  coloredSelectStyles,
} from './styles'
import Select from 'react-select'

const FloatingUI = ({ shapes, colors, onChooseShape, onChooseColors }) => {
  const shapeOptions = shapes.map(({ label }) => ({ label, value: label }))
  const colorOptions = colors.map(({ label, value }) => ({ label, value, color: value }))

  return (
    <FloatingUIShell>
      <ControlSection>
        <ControlLabel>Shape</ControlLabel>
        <Select
          options={shapeOptions}
          // defaultValue={shapeOptions[0]}
          onChange={onChooseShape}
        />
      </ControlSection>
      <ControlSection>
        <ControlLabel>Colors</ControlLabel>
        <Select
          options={colorOptions}
          closeMenuOnSelect={false}
          isMulti
          styles={coloredSelectStyles}
          // defaultValue={}
          onChange={onChooseColors}
        />
      </ControlSection>
    </FloatingUIShell>
  )
}

export default FloatingUI
