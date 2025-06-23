import { basic, initSidebar, initTopbar } from './modules/layouts';
import { modeWatcher } from './modules/components/mode-toggle';

initSidebar();
initTopbar();
basic();
modeWatcher(); // Initialize theme toggle
