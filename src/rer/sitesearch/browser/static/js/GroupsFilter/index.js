/* eslint-disable no-prototype-builtins */
import React, { useContext } from 'react';
import SearchContext from '../utils/searchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getIcon } from '../utils/icons';

const GroupsFilter = () => {
  const { setFilters, filters, facets } = useContext(SearchContext);
  if (!facets || !facets.groups) {
    return '';
  }
  return (
    <div className="filter-item">
      <h5>Tipologia di contenuti</h5>
      {facets &&
        facets.groups &&
        facets.groups.order.map((group, idx) => {
          const groupData = facets.groups.values[group];
          let selected = false;
          if (!filters.group && idx === 0) {
            selected = true;
          } else {
            if (
              filters?.group === group ||
              (filters?.group?.hasOwnProperty('query') &&
                filters?.group?.query === group)
            ) {
              selected = true;
            }
          }
          return (
            <div className="radio" key={group + idx}>
              <input
                type="radio"
                name="types"
                value={groupData.types.length ? group : ''}
                checked={selected}
                id={group}
                aria-controls="sitesearch-results-list"
                onChange={e => {
                  setFilters({ group: e.target.value });
                }}
              />
              {groupData.icon && (
                <FontAwesomeIcon icon={getIcon(groupData.icon)} />
              )}
              <label
                htmlFor={group}
                className={selected ? 'selected text-primary' : ''}
              >
                {`${group} (${groupData.count})`}
              </label>
            </div>
          );
        })}
    </div>
  );
};

GroupsFilter.propTypes = {};

export default GroupsFilter;
