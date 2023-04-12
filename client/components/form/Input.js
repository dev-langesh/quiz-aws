export default function Input({ name, value, placeholder, changeHandler }) {
  return (
    <input
      className="border border-white focus:border-blue-700 bg-transparent px-3 py-2 outline-none"
      placeholder={placeholder}
      value={value}
      onChange={changeHandler}
      name={name}
    />
  );
}
