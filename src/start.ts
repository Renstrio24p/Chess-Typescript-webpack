import classNames from "classnames/bind";
import styles from './sass/modules/app.module.scss';
import Render from "./render/render";

export const cx = classNames.bind(styles);

export default function Start(start: HTMLElement): void {
    start.innerHTML = (
        `
           <div id='container'>
           </div>
    `
    )

    Render();
  }
  