import { reducer, Constants, getPlatformType } from 'helpers';

export default reducer({
    platformType: getPlatformType(),
    lang: Constants.DefaultSettings.lang,
    currentProject: null,
}, {
    SET_PLATFORM_TYPE: (state, { platformType }) => ({
        ...state,
        platformType,
    }),
    SET_LANGUAGE: (state, { lang }) => ({
        ...state,
        lang,
    }),
    SET_CURRENT_PROJECT: (state, { currentProject }) => ({
        ...state,
        currentProject,
    }),
});
