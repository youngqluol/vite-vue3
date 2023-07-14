import type { App, Component } from 'vue';

import { Document, Edit, Eleme, Goblet, HelpFilled, HomeFilled, Key, Setting, Shop, Switch } from '@element-plus/icons-vue';

export const toRegisterComponentsMap: Record<string, Component> = {
  Document,
  Edit,
  Eleme,
  Goblet,
  HelpFilled,
  HomeFilled,
  Key,
  Setting,
  Shop,
  Switch,
}

export default function registerElementIcons(app: App) {
  for (const compName in toRegisterComponentsMap) {
    app.component(compName, toRegisterComponentsMap[compName])
  }
}
