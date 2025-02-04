const Net = require('net');
const Interface = require('./interface');

class Network extends Interface {
  constructor(host, port, options) {
    super();
    options = options || {};
    this.timeout = options.timeout || 3000;
    this.host = host;
    this.port = port || 9100;
  }



  async execute(buffer, options = { waitForResponse }) {
    return new Promise((resolve, reject) => {
      const name = `${this.host}:${this.port}`;
      const networkConnection = Net.connect(
        {
          host: this.host,
          port: this.port,
          timeout: this.timeout,
        },
        () => {
          networkConnection.write(buffer, null, () => {
            console.log(`Data sent to printer: ${name}`, buffer);
            if (!options.waitForResponse) {
              networkConnection.destroy();
              resolve();
            }
          });
        }
      );

      networkConnection.on('data', function (data) {
        if (options.waitForResponse) {
          resolve(data);
          networkConnection.destroy();
        }
      });

      networkConnection.on('error', (error) => {
        reject(error);
        networkConnection.destroy();
      });

      networkConnection.on('timeout', () => {
        reject(new Error('Socket timeout'));
        networkConnection.destroy();
      });
    });
  }

  async getResponse(buffer) {
    return new Promise((resolve, reject) => {
      const printer = Net.connect(
        {
          host: this.host,
          port: this.port,
          timeout: this.timeout,
        },
        () => {
          printer.write(buffer, null);
        },
      );

      printer.on('data', (buffer, error) => {
        resolve(buffer);
        printer.destroy();
      });

      printer.on('error', (error) => {
        reject(error);
        printer.destroy();
      });

      printer.on('timeout', () => {
        reject(new Error('Socket timeout'));
        printer.destroy();
      });
    });
  }
}

module.exports = Network;
