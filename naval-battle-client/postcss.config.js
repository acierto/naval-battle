import autoprefixer from 'autoprefixer';
import doiuse from 'doiuse';

module.exports = {
    plugins: [
        autoprefixer({overrideBrowserslist: ['last 2 versions']}),
        doiuse({
            browsers: ['ie >= 11', 'last 1 Chrome version', 'last 1 Firefox version', 'last 1 Safari version'],
            ignore: ['flexbox', 'outline'],
            onFeatureUsage: (val) => {
                throw new Error(`You are using not supported CSS by all specified browsers. ${val.message}`);
            }
        })
    ]
};
