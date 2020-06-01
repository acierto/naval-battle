import path from 'path';

const projectDir = path.resolve(__dirname, '..', '..');
const distDir = path.resolve(projectDir, 'dist');
const devDistDir = path.resolve(projectDir, 'devDist');
const ghPagesDir = path.resolve(projectDir, 'ghPages');
const srcDir = path.resolve(projectDir, 'src');
const testsDir = path.resolve(projectDir, 'tests');
const buildDir = path.resolve(projectDir, 'build');

export default {
    buildDir,
    devDistDir,
    distDir,
    ghPagesDir,
    nodeModulesDir: `${projectDir}/node_modules`,
    projectDir,
    srcDir,
    testsDir
};
