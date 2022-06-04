import { IssueCard } from 'components';
import { IssueModal } from 'components/issues';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import './kanban.scss';

const Kanban = () => {
  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Thuy Tran
    </Tooltip>
  );

  return (
    <div className="kanban h-100">
      <div className="header">
        <h3 className="text-2xl font-medium">Kanban board</h3>
        <div className="flex mt-6 items-center">
          <div className="search relative mr-4">
            <span className="search__icon absolute">
              <i className="fa fa-search"></i>
            </span>
            <input
              className="search__input grow-default hover:bg-backgroundLight focus:bg-white"
              type="text"
            />
          </div>

          <div className="avatar-group flex">
            <OverlayTrigger placement="bottom" overlay={renderTooltip}>
              <div
                className="avatar"
                style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
              ></div>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={renderTooltip}>
              <div
                className="avatar"
                style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
              ></div>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={renderTooltip}>
              <div
                className="avatar"
                style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
              ></div>
            </OverlayTrigger>
          </div>

          <button className="kanban__btn text-textMedium p-2 hover:bg-backgroundLight rounded-sm mx-4 h-[2rem] leading-none">
            Only my issue
          </button>
          <button className="kanban__btn text-textMedium p-2 hover:bg-backgroundLight h-[2rem] leading-none">
            Ignore Resolved
          </button>
        </div>
      </div>
      <div className="kanban__board flex mt-7">

        <div className="kanban__board__item">
        <h5 className='kanban__board__title'>Back log</h5>
          <IssueCard/>
          <IssueCard/>
        </div>
        <div className="kanban__board__item">
        <h5 className='kanban__board__title'>Back log</h5>
          <IssueCard/>
        </div>
        <div className="kanban__board__item">
        <h5 className='kanban__board__title'>Back log</h5>
          <IssueCard/>
        </div>
        <div className="kanban__board__item">
        <h5 className='kanban__board__title'>Back log</h5>
          <IssueCard/>
        </div>
      </div>
      <IssueModal/>
    </div>
  );
};

export default Kanban;
