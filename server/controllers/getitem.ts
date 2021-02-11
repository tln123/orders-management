export const handleGetItem = (products: any, req: any, res: any) => {
    const itemId = <string>(req.params.itemId);
	const product = products[itemId];
	res.send({
		id: itemId,
		name: product.name,
		price: product.price,
		image: product.image,
	});
  }
  