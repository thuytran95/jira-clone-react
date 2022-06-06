import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import './issue-card.scss';

const IssueCard = () => {
  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Thuy Tran
    </Tooltip>
  );
  return (
    <div className="issue__card">
      <div className="issue__card__title">Angular sportify</div>
      <div className="flex items-center">
        <div
          className="issue__avatar issue__avatar--w24"
          style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
        ></div>
        <span className="issue__category uppercase ml-3 text-sm">STORY-2021</span>
        <div className="flex items-center ml-auto">
          <OverlayTrigger placement="bottom" overlay={renderTooltip}>
            <span className="issue__icon story-icon">
              <i className="fa fa-bookmark"></i>
            </span>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={renderTooltip}>
            <span className="issue__priority">
              <i className="fa fa-arrow-up"></i>
            </span>
          </OverlayTrigger>
        </div>
      </div>

    </div>
  );
};

export default IssueCard;
