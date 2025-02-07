import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import './_skeleton.scss';

const mapSkeleton = (style, rows = 1) => {
  switch (style) {
    case 'projects':
      return (
        <>
          {Array.from({ length: rows }).map((it, idx) => {
            return (
              <div
                key={idx}
                className="item"
              >
                <Skeleton
                  variant="square"
                  className="icon"
                  animation="wave"
                />
                <Skeleton
                  className="text"
                  animation="wave"
                />
              </div>
            );
          })}
        </>
      );
    case 'grid-tran':
      return (
        <>
          {Array.from({ length: rows }).map((it, idx) => {
            return (
              <div
                key={idx}
                className="row"
              >
                <Skeleton
                  variant="circle"
                  className="icon"
                  animation="wave"
                />
                <Skeleton
                  className="text"
                  animation="wave"
                />
                <Skeleton
                  className="amount"
                  animation="wave"
                />
              </div>
            );
          })}
        </>
      );
    case 'ticket':
      return (
        <div className="sq-skelton--ticket container-fluid">
          {Array.from({ length: rows }).map((it, idx) => {
            return (
              <div
                key={idx}
                className="row"
              >
                <Skeleton
                  variant="rect"
                  height={80}
                  width={'100%'}
                />
              </div>
            );
          })}
        </div>
      );
    case 'balance':
      return (
        <>
          <Skeleton
            className="text"
            width={250}
            animation="wave"
          />
          <h1>
            <Skeleton
              variant="rect"
              width={400}
            />
          </h1>
          <Skeleton
            className="text"
            width={150}
            animation="wave"
          />
        </>
      );
    case 'stat-chart':
      return (
        <>
          <Skeleton
            variant="rect"
            height={300}
          />
        </>
      );
    case 'amount-stat':
      return (
        <>
          <div className="top">
            <Skeleton
              className="eyebrow"
              width={100}
              animation="wave"
            />
          </div>
          <div className="data">
            <Skeleton
              className="percentage"
              width={70}
              animation="wave"
            />
            <Skeleton
              className="amount"
              variant="rect"
              animation="wave"
              width={200}
            />
          </div>
        </>
      );
    case 'permissions':
      return (
        <>
          <div className="left">
            <Skeleton
              className="eyebrow"
              width={200}
              animation="wave"
            />
            <Skeleton
              className="eyebrow"
              width={200}
              animation="wave"
            />
            <Skeleton
              className="eyebrow"
              width={200}
              animation="wave"
            />
            <Skeleton
              className="eyebrow"
              width={200}
              animation="wave"
            />
          </div>
          <div className="right">
            <div className="permission-item">
              <Skeleton
                className="amount"
                variant="rect"
                animation="wave"
                width={200}
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
            </div>
            <div className="permission-item">
              <Skeleton
                className="amount"
                variant="rect"
                animation="wave"
                width={200}
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
              <Skeleton
                className="percentage"
                width={70}
                animation="wave"
              />
            </div>
          </div>
        </>
      );
    case 'details':
      return (
        <>
          <div className="row">
            <div className="col-xs-12 col-md-8">
              <Skeleton height={150} />
            </div>
            <div className="col-xs-12 col-md-4">
              <Skeleton height={150} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Skeleton height={250} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Skeleton height={250} />
            </div>
          </div>
        </>
      );
    default:
      return (
        <>
          <div className="container-fluid">
            <Skeleton height={50} />
          </div>
        </>
      );
  }
};

const SQSkeleton = ({ styleName = 'default', rows }) => {
  return <div className={`sq-skeleton  sq-skeleton--${styleName}`}>{mapSkeleton(styleName, rows)}</div>;
};

SQSkeleton.propTypes = {
  styleName: PropTypes.string,
  rows: PropTypes.number,
};

export default SQSkeleton;
