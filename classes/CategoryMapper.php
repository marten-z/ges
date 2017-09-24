<?php
class CategoryMapper extends Mapper {
    
    public function getCategories() {
        $sql = "SELECT c.id, c.name
            from categories c";
        $stmt = $this->db->query($sql);
        $results = [];
        while($row = $stmt->fetch()) {
            $results[] = new CategoryEntity($row);
        }
        return $results;
    }
    
    /**
     * Get one category by its ID
     *
     * @param int $category_id The ID of the category
     * @return CategoryEntity  The category
     */
    public function getCategoryById($category_id) {
        $sql = "SELECT c.id, c.name
            from categories c
            where c.id = :category_id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["category_id" => $category_id]);
        if($result) {
            return new CategoryEntity($stmt->fetch());
        }
    }
    
    public function save(CategoryEntity $category) {
        $sql = "insert into categories
            (name) values
            (:name)";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            "name" => $category->getName(),
        ]);
        if(!$result) {
            throw new Exception("could not save record");
        }
    }
    
    public function deleteCategory($category_id) {
        $sql = "DELETE from categories c
            where c.id = :category_id";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute(["category_id" => $category_id]);
        if(!$result) {
            throw new Exception("could not delete record");
        }
    }
}