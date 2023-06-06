type microApp = {
  name: string;
  entry: string;
  container: '#view-main';
  activeRule: string;
  port: number | string;
};

const apps: microApp[] = [
  {
    name: 'my-app',
    entry: '//localhost:10001',
    container: '#view-main',
    activeRule: '/my-app',
    port: '10001',
  },
];

export default apps;
