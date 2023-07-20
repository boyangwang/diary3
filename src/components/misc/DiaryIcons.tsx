import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import Icon from '@ant-design/icons';
import { ReactComponent as homeSvg } from 'src/assets/icons/home-icon.svg';
import { ReactComponent as addSvg } from 'src/assets/icons/add-icon.svg';
import { ReactComponent as reminderSvg } from 'src/assets/icons/reminder-icon.svg';
import { ReactComponent as settingsSvg } from 'src/assets/icons/settings-icon.svg';
import { ReactComponent as editSvg } from 'src/assets/icons/edit-icon.svg';

export function EntryNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={homeSvg} {...props} />;
}
export function AddNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={addSvg} {...props} />;
}
export function ReminderNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={reminderSvg} {...props} />;
}
export function SettingsNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={settingsSvg} {...props} />;
}
export function EditNavIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={editSvg} {...props} />;
}

const DiaryIcons = {
  EntryNavIcon,
  AddNavIcon,
  ReminderNavIcon,
  SettingsNavIcon,
  EditNavIcon,
};
export const ICON_KEYS = Object.keys(DiaryIcons);
export default DiaryIcons;
