module.exports = {
  name: 'treino',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/treino',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
