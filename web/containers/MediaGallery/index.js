import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './_media-gallery.scss';
import { getMap } from '../../components/ui';
import { GLOBAL_OPTIONS } from '../../globals';
import { loadMedia, uploadMedia, updateMedia, copyMediaLink, deleteLink } from '../../redux/admin';
import { startLoading, stopLoading } from '../../redux/common';

const MediaGallery = ({ pageData, className = '', appStore, raiseAction, onAction }) => {
  useEffect(() => {
    loadImages();
  }, []);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [status, setStatus] = useState(undefined);
  const loadImages = async ({ pageNo = 1, filter = {} } = {}) => {
    const { pageSize } = appStore.admin?.mediaPage || {};
    raiseAction(startLoading());
    await raiseAction(
      loadMedia(
        {
          body: { status, ...filter },
          query: {
            pageSize: pageSize,
            pageNo: pageNo,
          },
        },
        pageData.searchMedia
      )
    );
    raiseAction(stopLoading());
  };
  const handlePageChange = (data) => {
    loadImages({ pageNo: data.value.currentPage });
  };
  const handleAction = async (item, action) => {
    switch (action.actionType) {
      case 'copy-link':
        raiseAction(copyMediaLink(item.url));
        break;
      case 'remove':
        raiseAction(startLoading());
        await raiseAction(deleteLink(item, pageData.deleteMedia));
        loadImages({ pageNo: appStore.admin?.mediaPage.currentPage });
        raiseAction(stopLoading());
        break;
      case 'publish':
        raiseAction(startLoading());
        await raiseAction(
          updateMedia(
            {
              ...item,
              status: 'PUBLISHED',
            },
            pageData.updateMedia
          )
        );
        loadImages({ pageNo: appStore.admin?.mediaPage.currentPage });
        raiseAction(stopLoading());
        break;
      case 'draft':
        raiseAction(startLoading());
        await raiseAction(
          updateMedia(
            {
              ...item,
              status: 'DRAFT',
            },
            pageData.updateMedia
          )
        );
        loadImages({ pageNo: appStore.admin?.mediaPage.currentPage });
        raiseAction(stopLoading());
        break;
      default:
        onAction && onAction(item, action);
    }
  };
  const handleFormChange = (data) => {};
  const handleButtonSelectionChange = (data) => {
    setStatus(data.value);
    loadImages({ pageNo: appStore.admin?.mediaPage.currentPage, filter: { status: data.value } });
  };
  const handleFormAction = async (data, action) => {
    raiseAction(startLoading());
    await raiseAction(uploadMedia(action, pageData.uploadMedia));
    setUploadDialog(false);
    raiseAction(stopLoading());
  };
  const handleAddNewClick = (d) => {
    setUploadDialog(true);
  };
  const { Pagination, ImageCardList, ButtonSelection, Skeleton, Button, Form, Dialog } = getMap();
  const { totalPages } = appStore.admin?.mediaPage || {};
  return (
    <div className="sq-media-gallery sq-v-screen">
      <div className={`sq-v-screen__container`}>
        <div className="container-fluid d-flex j-content-fl-end sq-media-gallery__top-actions">
          {/* <Tabs
            options={GLOBAL_OPTIONS.mediaGalleryTabs.toArray()}
            value={currentTab}
            onChange={handleTabChange}
          /> */}
          <div className="fl-grow j-content-fl-start">
            <ButtonSelection
              options={GLOBAL_OPTIONS.mediaStatus.toArray()}
              value={status}
              onChange={handleButtonSelectionChange}
            />
          </div>
          <Button
            iconName="add"
            buttonText={pageData.addMediaText || 'Add Media'}
            onClick={handleAddNewClick}
          />
          {appStore.admin?.mediaPage && (
            <Pagination
              onChange={handlePageChange}
              count={totalPages}
              value={appStore.admin?.mediaPage}
            />
          )}
        </div>
        <div className="sq-media-gallery__list">
          <div className="sq-v-screen-grow container-fluid">
            <ImageCardList
              paginationValue={appStore.admin?.mediaPage}
              imageUrlField={pageData.fields?.imageUrlField || 'url'}
              titleField={pageData.fields?.imageTitleField || 'fileName'}
              data={appStore.admin?.media}
              tagFieldName={'status'}
              loader={
                <Skeleton
                  styleName="projects"
                  rows={5}
                />
              }
              onAction={handleAction}
              actions={[
                {
                  cmpType: 'Button',
                  iconSize: 'small',
                  className: 'sq-button--block',
                  buttonText: 'Copy Link',
                  actionType: 'copy-link',
                },
                {
                  cmpType: 'Button',
                  iconSize: 'small',
                  className: 'sq-button--block',
                  beforeRender: (action, col, row) => {
                    console.log(action, col, row);
                    return !row.status || row.status === 'DRAFT';
                  },
                  buttonText: 'Publish',
                  color: 'info',
                  actionType: 'publish',
                },
                {
                  cmpType: 'Button',
                  iconSize: 'small',
                  className: 'sq-button--block',
                  buttonText: 'Move to Draft',
                  actionType: 'draft',
                  beforeRender: (action, col, row) => row.status === 'PUBLISHED',
                },
                {
                  cmpType: 'Button',
                  iconSize: 'small',
                  className: 'sq-button--block',
                  buttonText: 'Remove',
                  color: 'error',
                  actionType: 'remove',
                  confirm: {
                    title: 'Confirmation',
                    content: 'Are you sure to remove this image?',
                  },
                },

                ...(pageData.imageActions || []),
              ]}
            />
          </div>
        </div>
        <Dialog
          title={'Upload media'}
          classes={{
            body: 'sq-dialog__content-body--auto',
          }}
          closeButton={true}
          open={uploadDialog}
          onClose={() => setUploadDialog(false)}
        >
          <Form
            className={'pt-4'}
            fields={[
              {
                cmpType: 'FileUploader',
                uploadOnChange: false,
                actionType: 'module',
                name: 'files',
                multiple: false,
                fileTypes: ['JPG', 'JPEG', 'PNG', 'mp4', 'gif'],
                ...pageData.uploadConfig,
              },
              {
                cmpType: 'Alert',
                message: "Please ensure that the image name doesn't have any spaces.",
              },
            ]}
            onAction={handleFormAction}
            onChange={handleFormChange}
          />
        </Dialog>
      </div>
    </div>
  );
};

MediaGallery.propTypes = {
  className: PropTypes.string,
};

export default MediaGallery;
