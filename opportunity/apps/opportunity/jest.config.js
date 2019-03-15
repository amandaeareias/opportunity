module.exports = {
  name: 'opportunity',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/opportunity/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
