import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './_media-gallery.scss';
import { getMap } from '../../components/ui';
import { GLOBAL_OPTIONS } from '../../globals';
import {
  loadMedia,
  uploadMedia,
  copyMediaLink,
  deleteLink,
} from '../../redux/admin';
import { startLoading, stopLoading } from '../../redux/common';

const MediaGallery = ({
  pageData,
  className = '',
  appStore,
  raiseAction,
  onAction,
}) => {
  useEffect(() => {
    loadImages();
  }, []);
  const [uploadDialog, setUploadDialog] = useState(false);
  const loadImages = async ({ pageNo = 1, filter = {} } = {}) => {
    const { pageSize } = appStore.admin?.mediaPage || {};
    raiseAction(startLoading());
    await raiseAction(
      loadMedia(
        {
          body: filter,
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
      default:
        onAction && onAction(item, action);
    }
  };
  const handleFormChange = (data) => {
    console.log(data);
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
  const { Pagination, ImageCardList, Skeleton, Button, Form, Dialog } =
    getMap();
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
              loader={<Skeleton styleName="projects" rows={5} />}
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
                message:
                  "Please ensure that the image name doesn't have any spaces.",
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
