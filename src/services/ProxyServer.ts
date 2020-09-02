export interface ProxyItem {
  urlPattern: string;
  proxyServer: string;
}

export class ProxyServer {
  getProxyList(): ProxyItem[] {
    return [];
  }
  addProxyItem(item: ProxyItem): Promise<void> {
    // noop
  };
  removeProxyItem(item: ProxyItem | string): Promise<void> {
    // noop
  }
}