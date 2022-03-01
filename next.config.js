const path = require('path');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => ({
    ...defaultConfig,
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
});
