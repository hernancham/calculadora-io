export const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: any;
  onChange: any;
  placeholder: string;
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        type="number"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export const ResolveButton = ({ funtionClick }: { funtionClick: any }) => {
  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
      onClick={funtionClick}
    >
      Resolver
    </button>
  );
};

export const OutputField = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="w-full px-3 py-2 border bg-gray-100 rounded-md">
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );
};
