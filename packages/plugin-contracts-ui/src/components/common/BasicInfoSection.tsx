import {
  __,
  Alert,
  Button,
  confirm,
  DropdownToggle,
  Icon,
  MainStyleInfoWrapper as InfoWrapper,
  ModalTrigger,
  Sidebar
} from '@erxes/ui/src';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ContractForm from '../../containers/ContractForm';

import { Action, Name } from '../../styles';
import { IContract } from '../../types';
import DetailInfo from './DetailInfo';

type Props = {
  contract: IContract;
  remove: () => void;
};

class BasicInfoSection extends React.Component<Props> {
  renderAction() {
    const { remove } = this.props;

    const onDelete = () =>
      confirm()
        .then(() => remove())
        .catch(error => {
          Alert.error(error.message);
        });

    return (
      <Action>
        <Dropdown>
          <Dropdown.Toggle as={DropdownToggle} id="dropdown-info">
            <Button btnStyle="simple" size="medium">
              {__('Action')}
              <Icon icon="angle-down" />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <li>
              <a href="#delete" onClick={onDelete}>
                {__('Delete')}
              </a>
            </li>
          </Dropdown.Menu>
        </Dropdown>
      </Action>
    );
  }

  render() {
    const { Section } = Sidebar;
    const { contract } = this.props;

    const content = props => <ContractForm {...props} contract={contract} />;

    return (
      <Sidebar.Section>
        <InfoWrapper>
          <Name>{contract.name}</Name>
          <ModalTrigger
            title="Edit basic info"
            trigger={<Icon icon="edit" />}
            size="xl"
            content={content}
          />
        </InfoWrapper>

        {this.renderAction()}

        <Section>
          <DetailInfo contract={contract} />
        </Section>
      </Sidebar.Section>
    );
  }
}

export default BasicInfoSection;