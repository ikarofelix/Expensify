import React, {memo} from 'react';
import {View} from 'react-native';
import type {ValueOf} from 'type-fest';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import type {Icon} from '@src/types/onyx/OnyxCommon';
import Avatar from './Avatar';
import UserDetailsTooltip from './UserDetailsTooltip';

type SubscriptAvatarProps = {
    /** Avatar URL or icon */
    mainAvatar?: Icon;

    /** Subscript avatar URL or icon */
    secondaryAvatar?: Icon;

    /** Set the size of avatars */
    size?: ValueOf<typeof CONST.AVATAR_SIZE>;

    /** Background color used for subscript avatar border */
    backgroundColor?: string;

    /** Removes margin from around the avatar, used for the chat view */
    noMargin?: boolean;

    /** Whether to show the tooltip */
    showTooltip?: boolean;
};

function SubscriptAvatar({mainAvatar, secondaryAvatar, size = CONST.AVATAR_SIZE.DEFAULT, backgroundColor, noMargin = false, showTooltip = true}: SubscriptAvatarProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const isSmall = size === CONST.AVATAR_SIZE.SMALL;
    const subscriptStyle = size === CONST.AVATAR_SIZE.SMALL_NORMAL ? styles.secondAvatarSubscriptSmallNormal : styles.secondAvatarSubscript;
    const containerStyle = StyleUtils.getContainerStyles(size);

    return (
        <View style={[containerStyle, noMargin ? styles.mr0 : {}]}>
            <UserDetailsTooltip
                shouldRender={showTooltip}
                accountID={Number(mainAvatar?.id ?? -1)}
                icon={mainAvatar}
            >
                <View>
                    <Avatar
                        containerStyles={StyleUtils.getWidthAndHeightStyle(StyleUtils.getAvatarSize(size || CONST.AVATAR_SIZE.DEFAULT))}
                        source={mainAvatar?.source}
                        size={size}
                        name={mainAvatar?.name}
                        type={mainAvatar?.type}
                        fallbackIcon={mainAvatar?.fallbackIcon}
                    />
                </View>
            </UserDetailsTooltip>
            <UserDetailsTooltip
                shouldRender={showTooltip}
                accountID={Number(secondaryAvatar?.id ?? -1)}
                icon={secondaryAvatar}
            >
                <View
                    style={[size === CONST.AVATAR_SIZE.SMALL_NORMAL ? styles.flex1 : {}, isSmall ? styles.secondAvatarSubscriptCompact : subscriptStyle]}
                    // Hover on overflowed part of icon will not work on Electron if dragArea is true
                    // https://stackoverflow.com/questions/56338939/hover-in-css-is-not-working-with-electron
                    dataSet={{dragArea: false}}
                >
                    <Avatar
                        iconAdditionalStyles={[
                            StyleUtils.getAvatarBorderWidth(isSmall ? CONST.AVATAR_SIZE.SMALL_SUBSCRIPT : CONST.AVATAR_SIZE.SUBSCRIPT),
                            StyleUtils.getBorderColorStyle(backgroundColor ?? theme.componentBG),
                        ]}
                        source={secondaryAvatar?.source}
                        size={isSmall ? CONST.AVATAR_SIZE.SMALL_SUBSCRIPT : CONST.AVATAR_SIZE.SUBSCRIPT}
                        name={secondaryAvatar?.name}
                        type={secondaryAvatar?.type}
                        fallbackIcon={secondaryAvatar?.fallbackIcon}
                    />
                </View>
            </UserDetailsTooltip>
        </View>
    );
}

SubscriptAvatar.displayName = 'SubscriptAvatar';

export default memo(SubscriptAvatar);
export type {SubscriptAvatarProps};
