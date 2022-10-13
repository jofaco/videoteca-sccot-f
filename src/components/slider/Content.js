import React from 'react';
import IconCross from '../Icon/IconCross';
import './Content.scss';

const Content = ({ video, onClose }) => (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      <div
        className="content__background__image"
        style={{ 'backgroundImage': `url(http://localhost:8000${video.featured_image})` }}
      />
    </div>
    <div className="content__area"> 
      <div className="content__area__container">
        <div className="content__title">{video.title_espanol}</div>
        <div className="content__description">
          {video.description_esp}
        </div>
        <div className='content__button'>
          <button className='content__button__repro'>Play</button>
        </div>
      </div>
      <button className="content__close" onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
);

export default Content;