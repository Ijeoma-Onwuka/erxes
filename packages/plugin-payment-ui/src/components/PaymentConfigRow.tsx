import Pagination from '@erxes/ui/src/components/pagination/Pagination';
import React from 'react';
import Collapse from 'react-bootstrap/Collapse';

import PaymentConfigList from '../containers/PaymentConfigList';
import { ByKindTotalCount } from '../types';
import PaymentConfigEntry from './PaymentConfigEntry';
import { CollapsibleContent, PaymentConfigRow } from './styles';

type Props = {
  paymentConfigs: any[];
  queryParams: any;
  paymentConfigsCount?: ByKindTotalCount;
};

type State = {
  isContentVisible: boolean;
  kind: string | null;
};

class Row extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const {
      queryParams: { kind }
    } = props;

    this.state = {
      isContentVisible: Boolean(kind) || false,
      kind
    };
  }

  getClassName = type => {
    const { kind, isContentVisible } = this.state;

    if (!isContentVisible) {
      return '';
    }

    if (type === kind) {
      return 'active';
    }

    return '';
  };

  toggleBox = (selectedKind: string, isAvailable?: boolean) => {
    if (isAvailable && !isAvailable) {
      return null;
    }

    const { isContentVisible, kind } = this.state;

    this.setState(prevState => {
      if (
        prevState.kind === selectedKind ||
        kind === null ||
        !isContentVisible
      ) {
        return { isContentVisible: !isContentVisible, kind: selectedKind };
      }

      return {
        kind: selectedKind,
        isContentVisible: prevState.isContentVisible
      };
    });

    return null;
  };

  renderPagination(totalCount) {
    if (!totalCount || totalCount <= 20) {
      return null;
    }

    return <Pagination count={totalCount} />;
  }

  renderEntry(paymentConfig, paymentConfigsCount, queryParams) {
    const commonProp = {
      key: paymentConfig.name,
      paymentConfig,
      toggleBox: this.toggleBox,
      getClassName: this.getClassName,
      paymentConfigsCount,
      queryParams
    };

    return <PaymentConfigEntry {...commonProp} />;
  }

  renderList() {
    const { queryParams, paymentConfigsCount } = this.props;
    const kind = this.state.kind || '';
    const count = (paymentConfigsCount && paymentConfigsCount[kind]) || 0;

    return (
      <>
        <PaymentConfigList
          kind={kind}
          queryParams={queryParams}
          paymentConfigsCount={count}
        />
        {this.renderPagination(count)}
      </>
    );
  }

  render() {
    console.log('this.props', this.props);
    const { paymentConfigs, paymentConfigsCount, queryParams } = this.props;

    const selected = paymentConfigs.find(
      paymentConfig => paymentConfig.kind === this.state.kind
    );

    return (
      <>
        <PaymentConfigRow>
          {paymentConfigs.map(paymentConfig =>
            this.renderEntry(paymentConfig, paymentConfigsCount, queryParams)
          )}
        </PaymentConfigRow>
        <Collapse
          in={this.state.isContentVisible && selected ? true : false}
          unmountOnExit={true}
        >
          <CollapsibleContent>{this.renderList()}</CollapsibleContent>
        </Collapse>
      </>
    );
  }
}

export default Row;
