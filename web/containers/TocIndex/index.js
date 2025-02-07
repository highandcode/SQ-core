import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../../components/ui/Header";
import LinkButton from "../../components/ui/LinkButton";
import "./_toc-index.scss";

class TableOfContent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  extractCatName  (name) {
    if (name.indexOf('::') > -1) {
      return name.substr(name.indexOf('::') + 2);
    }
    return name;
  };

  render() {
    const { metaData = {}, pageData = {}, ...rest } = this.props;
    const { className = "" } = pageData;
    const categories = Object.keys(metaData.siblingPages || {});
    return (
      <div className={`sq-content-toc sq-content-page__body ${className}`}>
        <div className="container-fluid">
          <Header header={pageData.title} className="text-center" />
          <div className="sq-content-toc__container">
            {categories &&
              categories.map((cat, idx) => {
                const category = metaData.siblingPages[cat];
                return (
                  <div key={idx} className="sq-content-toc__item">
                    <h4 className="sq-content-toc__header ">{this.extractCatName(cat)} </h4>
                    {category.map((data, cIdx) => {
                      return (
                        <div key={cIdx}>
                          <LinkButton to={data.path} buttonText={data.title} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

TableOfContent.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object,
};

export default TableOfContent;
