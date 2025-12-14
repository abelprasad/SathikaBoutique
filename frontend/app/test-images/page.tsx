export default function TestImages() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white' }}>
      <h1>Image Test Page</h1>

      <h2>Test 1: Basic img tag with full URL</h2>
      <img
        src="http://localhost:5000/uploads/products/DSCF2060-1765732782426-904447377.JPG"
        alt="Test 1"
        style={{ width: '300px', border: '2px solid red' }}
      />

      <h2>Test 2: img tag with inline styles</h2>
      <img
        src="http://localhost:5000/uploads/products/DSCF2070-1765732782982-792204626.JPG"
        alt="Test 2"
        style={{
          width: '300px',
          height: '300px',
          objectFit: 'cover',
          border: '2px solid blue',
          display: 'block'
        }}
      />

      <h2>Test 3: Simple img with no styling</h2>
      <img
        src="http://localhost:5000/uploads/products/DSCF2073-1765732783497-978473883.JPG"
        alt="Test 3"
        width="300"
      />
    </div>
  );
}
