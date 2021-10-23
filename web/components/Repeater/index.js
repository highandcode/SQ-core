import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './repeater.scss';

const Repeater = ({
  className = '',
  data = [],
  dataGroup = {},
  options = {},
  onAction,
  template = () => {
    return <div>{`Template not defined`}</div>;
  },
  groupTemplate = () => {
    return <div>{`Group Template not defined`}</div>;
  }
}) => {
  const Template = template;
  const [selectedGroups, setSelectedGroup] = useState({});
  const GroupTemplate = groupTemplate;
  const { field: groupField } = dataGroup;
  let groupData;
  if (groupField) {
    groupData = _.groupBy(data, groupField);
  }

  const handleOnGroupClick = (group) => {
    setSelectedGroup({
      ...selectedGroups,
      [group]: !selectedGroups[group]
    });
  };

  return (
    <div className={`sq-repeater ${className}`}>
      {groupData &&
        Object.keys(groupData).map((groupKey, index) => {
          const items = groupData[groupKey];
          const isActive = !!selectedGroups[groupKey];
          return (
            <div key={index} className={`sq-repeater__group ${isActive ? 'sq-repeater__group--active' : ''}`}>
              <div className="sq-repeater__group-header" onClick={() => handleOnGroupClick(groupKey)}>
                <GroupTemplate
                  data={{
                    group: groupKey,
                    items
                  }}
                  onAction={onAction}
                  options={options}
                  active={isActive}
                />
              </div>
              <div className="sq-repeater__group-body">
                {items &&
                  items.map((dataItem, index) => {
                    return (
                      <div className="sq-repeater__item" key={index}>
                        <Template data={dataItem} options={options} />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      {!groupData &&
        data.map((dataItem, index) => {
          return (
            <div className="sq-repeater__item" key={index}>
              <Template data={dataItem} options={options} onAction={onAction} />
            </div>
          );
        })}
    </div>
  );
};

Repeater.propTypes = {
  template: PropTypes.func,
  groupTemplate: PropTypes.func,
  onAction: PropTypes.func,
  options: PropTypes.object,
  className: PropTypes.string,
  data: PropTypes.array
};

export default Repeater;
