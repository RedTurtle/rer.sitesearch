import React, { useContext } from 'react';
import SearchContext from '../utils/searchContext';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';

const SelectField = ({ values, filters, index, setFilters, name }) => {
  const { translations } = useContext(SearchContext);
  const getCleanSector = sector => {
    if (!sector) {
      return sector;
    }
    const char = '-';
    if (sector.includes(char)) {
      const [code, valueToShow] = sector.split(char, 2);
      const trimmedCode = code.trim();
      if (!isNaN(trimmedCode)) {
        return valueToShow.trim();
      }
    }
    return sector;
  };

  const options = Object.keys(values).map(key => {
    const label = `${
      translations[key.trim()] ? translations[key.trim()] : key
    } (${values[key]})`;
    return {
      value: key,
      label: name==='Settore'?getCleanSector(label):label,
    };
  });
  const getPlaceholder = () => {
    switch (name) {
      case 'Argomento':
        return 'Cerca per argomento';

      case 'Settore':
        return 'Cerca per settore';

      default:
        return 'Seleziona un valore';
    }
  };
  return (
    <Select
      options={options}
      isMulti
      isClearable
      components={{
        // eslint-disable-next-line react/display-name
        MultiValueLabel: props => (
          <components.MultiValueLabel {...props} className="text-primary" />
        ),
        IndicatorSeparator: () => null,
      }}
      className="rer-sitesearch-select text-primary"
      placeholder={getPlaceholder()}
      aria-controls="sitesearch-results-list"
      value={options.filter(option =>
        filters[index] ? filters[index]?.query?.includes(option?.value) : false,
      )}
      onChange={option => {
        if (!option || option.length == 0) {
          setFilters({ ...filters, [index]: '' });
        } else {
          setFilters({
            ...filters,
            [index]: {
              query: option.map(({ value }) => value),
              operator: 'and',
            },
          });
        }
      }}
    />
  );
};

SelectField.propTypes = {
  values: PropTypes.object,
  filters: PropTypes.object,
  index: PropTypes.string,
  setFilters: PropTypes.func,
};

export default SelectField;
