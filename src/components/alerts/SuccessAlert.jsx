import { textCapitalize } from '../../utils/helpers';

export default function SuccessAlert({ isSuccess, success }) {
	if (!isSuccess) return null;

	return (
		<div className="p-4 mb-6 font-medium text-green-600 bg-green-200 border rounded-md">
			{textCapitalize(success.message)}
		</div>
	);
}
