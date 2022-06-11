import { useDrag } from 'react-dnd';
import './issue-card.scss';

interface DropResult {
  name: string
}

const IssueCard = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'issue',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  console.log(isDragging);

  return (
    <div className="issue__card" ref={drag}>
      <div className="issue__card__title">Angular sportify</div>
      <div className="flex items-center">
        <div
          className="issue__avatar issue__avatar--w24"
          style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
        ></div>
        <span className="issue__category uppercase ml-3 text-sm">STORY-2021</span>
        <div className="flex items-center ml-auto">
          <span className="issue__icon story-icon base-tooltip" data-content="Story">
            <i className="fa fa-bookmark"></i>
          </span>

          <span className="issue__priority base-tooltip" data-content="Highest">
            <i className="fa fa-arrow-up"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
