import './style.css';
import NetSuiteTricksIcon from '../public/icons/icon-128.png';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>NetSuite Tricks</h1>
    <img src="${NetSuiteTricksIcon}" style="width:96px;" />
    <p>
      NetSuite Tricks 🪄 is a tool for improve your developer experience.
    </p>
  </div>
`;
