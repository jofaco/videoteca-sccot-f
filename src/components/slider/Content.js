import React from 'react';
import IconCross from './../Icons/IconCross';
import './Content.scss';

const Content = ({ video, onClose }) => (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      <div
        className="content__background__image"
        style={{ 'background-image': `url(${video.featured_image})` }}
      />
    </div>
    <div className="content__area">
      <div className="content__area__container">
        <div className="content__title">{video.title_espanol}</div>
        <div className="content__description">
          {video.description}
        </div>
      </div>
      <button className="content__close" onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
);

export default Content;