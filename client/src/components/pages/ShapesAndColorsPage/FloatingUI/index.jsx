import Select from 'react-select'
import {
  FloatingUIShell,
  ControlSection,
  ControlLabel,
  coloredSelectStyles,
} from './styles'

const FloatingUI = ({ shapes, colors, onChooseShape, onChooseColors }) => {
  // react-select expects an array of objects with { label, value }
  // when it creates it's <option>'s
  const shapeOptions = shapes.map(({ label }) => ({ label, value: label }))
  const colorOptions = colors.map(({ label, value }) => ({ label, value, color: value }))

  return (
    <FloatingUIShell>
      <ControlSection>
        <ControlLabel>Shape</ControlLabel>
        <Select options={shapeOptions} onChange={onChooseShape} />
      </ControlSection>
      <ControlSection>
        <ControlLabel>Colors</ControlLabel>
        <Select
          options={colorOptions}
          closeMenuOnSelect={false}
          isMulti
          styles={coloredSelectStyles}
          onChange={onChooseColors}
        />
      </ControlSection>
    </FloatingUIShell>
  )
}

export default FloatingUI
