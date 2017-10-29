<?php
class ProductMapper extends Mapper {
    
    public function getAll() {
        $sql = "SELECT id, name, category_id
            from products";
        $stmt = $this->db->query($sql);
        $results = [];
        while($row = $stmt->fetch()) {
            $results[] = new ProductEntity($row);
        }
        return new ProductList($results);
    }
    
    /**
     * Get one product by its ID
     *
     * @param int $product_id The ID of the product
     * @return ProductEntity  The product
     */
    public function getById($product_id) {
        $sql = "SELECT id, name, category_id
            from products
            where id = :product_id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["product_id" => $product_id]);
        if($result) {
            return new ProductEntity($stmt->fetch());
        }
    }
    
    public function create(ProductEntity $product) {
        $sql = "insert into products
            (name, category_id) values
            (:name, :category_id)";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            "name" => $product->getName(),
            "category_id" => $product->getCategoryId()
        ]);
        if(!$result) {
            throw new Exception("could not create record");
        }
    }
    
    public function update(ProductEntity $product) {
        $sql = "update products
            set name = :name,
            category_id = :category_id
            where id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            "id" => $product->getId(),
            "name" => $product->getName(),
            "category_id" => $product->getCategoryId()
        ]);
        if(!$result) {
            throw new Exception("could not update record");
        }
    }
    
    public function delete($product_id) {
        $sql = "DELETE from products
            where id = :id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["id" => $product_id]);
        if(!$result) {
            throw new Exception("could not delete record");
        }
    }
}