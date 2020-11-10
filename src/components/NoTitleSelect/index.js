import React from 'react';
import chroma from 'chroma-js';

import Select, { components } from 'react-select';

import PropTypes from 'prop-types';
import arrow from '~/assets/arrow3.svg';
import arrowGreen from '~/assets/arrowdropdown_green.svg';
import addItem from '~/assets/plus_category.svg';

import { Title, Indicator, Menu } from './styles';

export const colourOptions = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];

const Placeholder = props => {
  return <components.Placeholder {...props} />;
};

// const MenuList = ({ selectProps, children, ...rest }) => {
//   const { customWidth } = selectProps;
//   return (
//     <components.MenuList {...rest}>
//       <Menu style={{ width: customWidth - 8 }} onClick={() => {}}>
//         <span>
//           <img src={addItem} alt="addItem" />
//           Add new
//         </span>
//       </Menu>
//       {children}
//     </components.MenuList>
//   );
// };

const IndicatorSeparator = ({ innerProps, selectProps, isFocused }) => {
  const { customColor } = selectProps;

  return (
    <Indicator
      {...innerProps}
      isFocused={isFocused}
      style={customColor ? { backgroundColor: customColor } : {}}
    />
  );
};

const DropdownIndicator = ({ selectProps, ...rest }) => {
  const { customColor } = selectProps;

  return (
    <components.DropdownIndicator {...rest}>
      <img src={customColor ? arrowGreen : arrow} alt="Arrow Down Icon" />
    </components.DropdownIndicator>
  );
};

export default function CustomSelect({
  setValue,
  placeholder,
  data,
  fontSize,
  defaultValue,
  customWidth,
  customColor,
  hasMarginLeft,
}) {
  return (
    <Select
      placeholder={placeholder}
      components={{
        Placeholder,
        IndicatorSeparator,
        DropdownIndicator,
      }}
      onChange={({ label }) => setValue(label)}
      options={data || colourOptions}
      customWidth={customWidth}
      customColor={customColor}
      defaultValue={defaultValue}
      fontSize={fontSize}
      styles={{
        control: (styles, { isFocused, selectProps: { menuIsOpen } }) => ({
          ...styles,
          height: 32,
          maxHeight: 32,
          minHeight: 32,
          backgroundColor: '#fff',
          // width: isFocused ? 223 : 221,
          borderWidth: isFocused ? 0.5 : 1,
          borderStyle: 'solid',
          borderColor: customColor || (menuIsOpen ? '#1DC167' : '#bec2c8'),
          paddingLeft: 4,
          padding: 0,
          color: customColor || '#424242',
          borderRadius: 2,
          fontSize: 12,
          width: customWidth,
          '&:hover': {
            borderWidth: isFocused ? 0.5 : 1,
          },
        }),
        placeholder: base => ({
          ...base,
          fontSize: 12,
          fontStyle: 'italic',
          lineHeight: 16,
          fontFamily: 'SFPro',
          letterSpacing: 0,
          color: customColor || '#BBBFC6',
          padding: 0,
          paddingLeft: 2,
          margin: 0,
        }),
        dropdownIndicator: (base, { isFocused }) => ({
          ...base,
          backgroundColor: isFocused ? '#eceef1' : '#fff',
          borderWidth: 2,
          height: 29,
          borderStyle: 'solid',
          borderColor: '#fff',
        }),
        menu: base => ({
          ...base,
          backgroundColor: '#fff',
          marginTop: -2.5,
          borderRadius: 0,
          width: customWidth + 0.5,
          zIndex: 1099,
        }),
        menuList: base => ({
          ...base,
          borderRadius: 0,
          width: customWidth + 0.5,
          zIndex: 1099,
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
          const color = chroma('#1DC167');
          return {
            ...styles,
            fontSize: 12,
            backgroundColor: isDisabled
              ? null
              : isSelected
              ? '#1DC167'
              : isFocused
              ? '#f4f5f8'
              : null,
            color: isSelected ? '#fff' : isFocused ? '#1DC167' : '#424242',
            width: customWidth - 8,
            marginLeft: 4,
            marginTop: 4,
            zIndex: 1099,

            ':active': {
              ...styles[':active'],
              backgroundColor:
                !isDisabled &&
                (isSelected ? data.color : color.alpha(0.3).css()),
            },
          };
        },
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 2,
        borderWidth: 1.5,
        colors: {
          ...theme.colors,
          primary25: '#1DC167',
          primary: '#1DC167',
        },
      })}
    />
  );
}

CustomSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  customColor: PropTypes.string,
  defaultValue: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  customWidth: PropTypes.number,
  fontSize: PropTypes.number,
  hasMarginLeft: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array]),
};

CustomSelect.defaultProps = {
  data: [],
  defaultValue: '',
  customWidth: 170.5,
  fontSize: 12,
  customColor: '',
  hasMarginLeft: false,
};
