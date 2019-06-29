const PlatformTypes = {
    DESKTOP: 'DESKTOP',
    MOBILE: 'MOBILE',
    TABLET: 'TABLET',
};

const DefaultSettings = {
    lang: 'en',
};

export const selectStyles = {
    container: styles => ({
        ...styles,
        margin: '15px 5px 30px 5px',
    }),
    control: styles => ({
        ...styles,
        borderColor: '#E3E3E3',
        borderRadius: '30px',
        padding: '5px 18px',
        minHeight: '34px',
    }),
    valueContainer: styles => ({
        ...styles,
        height: '22px',
        padding: 0,
    }),
    indicatorsContainer: styles => ({
        ...styles,
        height: '22px',
    }),
    singleValue: styles => ({
        ...styles,
        fontSize: '12px',
    }),
};

export const taskStatuses = [
    'To Do',
    'In Progress',
    'Done',
];

export default {
    PlatformTypes,
    DefaultSettings,
};
