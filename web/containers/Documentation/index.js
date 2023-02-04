import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/ui/Header';
import NavigationList from '../../components/ui/NavigationList';
import CodeHighlight from '../../components/ui/CodeHighlight';
import Option from './templates/option';
import Method from './templates/method';
import Event from './templates/event';

const _tempaltes = {
  Option,
  Method,
  Event
};


class ComponentDemo extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { metaData = {}, pageData = {}, ...rest } = this.props;
    eval(pageData.javascript);
  }

  render() {
    const { metaData = {}, pageData = {}, transitionClass, ...rest } = this.props;
    const { className = '', itemTemplate } = pageData;
    return (
      <div className={`sq-content-doc sq-content-page__body ${className}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <NavigationList links={metaData.siblingPages} />
            </div>
            <div className={`col-xs-12 col-md-9 ${transitionClass}`}>
              {/* <Content pageData={pageData} metaData={metaData} {...rest} /> */}
              <Header header={pageData.title} subHeader={pageData.description} />

              <div className="sq-content-doc__navigation mb-xtrawide">
                {pageData.items &&
                  pageData.items.map((item) => {
                    return (
                      <div>
                        <a href={`#${item.name}`}>{item.name} </a>
                      </div>
                    );
                  })}
              </div>

              {pageData.items &&
                pageData.items.map((item) => {
                  const TemplateToRender = _tempaltes[itemTemplate] || _tempaltes.Option;
                  return (
                    <div className="sq-content-doc__block mb-xtrawide">
                      <a name={item.name}></a>
                      <TemplateToRender item={item} />
                      <h4>Code Example</h4>
                      <CodeHighlight language="javascript" code={item.example} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ComponentDemo.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object
};

export default ComponentDemo;
